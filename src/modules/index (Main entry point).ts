// index.ts

import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import flash from 'connect-flash';
import path from 'path';
import DataParser from './DataParser'; // Import your DataParser module
import User from './User'; // Import your User module
import { ensureAuthenticated, ensureAdmin } from './authMiddleware'; // Import your custom authentication middleware

// Initialize Express
const app = express();
const port = process.env.PORT || 3000;

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express Session Middleware
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash Middleware
app.use(flash());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Global Variables for Flash Messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Passport Configuration (Local Strategy)
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    (email, password, done) => {
      User.getUserByEmail(email, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Unknown User' });
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Invalid Password' });
          }
        });
      });
    }
  )
);

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user);
  });
});

// Define your routes here
app.get('/', (req, res) => {
  res.render('index'); // Replace with your template rendering logic
});

app.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard'); // Replace with dashboard template rendering logic
});

app.get('/admin', ensureAdmin, (req, res) => {
  res.render('admin'); // Replace with admin page template rendering logic
});

// Add more routes for your application features

// Start Server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});