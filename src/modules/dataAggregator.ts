// dataAggregator.ts

class DataAggregator {
  private inventoryData: Array<{ name: string; quantity: number }> = [];

  constructor() {
    // Initialize any required properties or dependencies
  }

  // Method to add parsed inventory data to the aggregator
  addInventoryItem(item: { name: string; quantity: number }): void {
    this.inventoryData.push(item);
  }

  // Method to calculate the total quantity of items in the inventory
  calculateTotalQuantity(): number {
    const totalQuantity = this.inventoryData.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    return totalQuantity;
  }

  // Method to find items with low quantity (e.g., below a threshold)
  findLowQuantityItems(threshold: number): Array<{
    name: string;
    quantity: number;
  }> {
    const lowQuantityItems = this.inventoryData.filter(
      (item) => item.quantity < threshold
    );
    return lowQuantityItems;
  }

  // Other analysis methods can be added here as needed

  // Method to reset the inventory data (e.g., for a new analysis)
  resetInventoryData(): void {
    this.inventoryData = [];
  }
}

export default DataAggregator;