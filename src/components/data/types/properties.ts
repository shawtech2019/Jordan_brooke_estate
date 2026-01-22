// property.types.ts

export interface Agent {
    name: string;
    phone: string;
    email: string;
  }
  
  export type PropertyStatus = "available" | "rented";
  export type PropertyType = "Residential" | "Commercial";
  
  export interface Property {
    id: number;
    title: string;
    location: string;
    address: string;
    price: string;
    priceLabel: string;
    beds: number;
    baths: number;
    sqft: string;
    image: string;
    images: string[];
    status: PropertyStatus;
    type: PropertyType;
    description: string;
    features: string[];
    agent: Agent;
  }
  
  /**
   * Generic pagination wrapper (API ready)
   */
  export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    perPage: number;
    total: number;
  }
  