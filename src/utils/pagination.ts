import { ProductInterface } from "@/pages/Products";

class Pagination {
    private items: ProductInterface[];
    private itemsPerPage: number;
    private currentPage: number;
  
    constructor(items: ProductInterface[], itemsPerPage: number) {
      this.items = items;
      this.itemsPerPage = itemsPerPage;
      this.currentPage = 1;
    }
  
    getTotalPages(): number {
      return Math.ceil(this.items.length / this.itemsPerPage);
    }
  
    getCurrentPageItems(): ProductInterface[] {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.items.slice(startIndex, endIndex);
    }
  
    setPage(pageNumber: number) {
      if (pageNumber >= 1 && pageNumber <= this.getTotalPages()) {
        this.currentPage = pageNumber;
      }
    }
  
    nextPage() {
      if (this.hasNextPage()) {
        this.currentPage++;
      }
    }
  
    prevPage() {
      if (this.hasPrevPage()) {
        this.currentPage--;
      }
    }
  
    getCurrentPage(): number {
      return this.currentPage;
    }
  
    hasNextPage(): boolean {
      return this.currentPage < this.getTotalPages();
    }
  
    hasPrevPage(): boolean {
      return this.currentPage > 1;
    }
  }
  
  export default Pagination;
  