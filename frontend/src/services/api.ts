// frontend/src/services/api.ts

export const API_CONFIG = {
  BASE_URL: 'https://editscape-orgeditingweb.onrender.com', // Your live backend URL
};

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image_url: string;
  link: string;
  created_at: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Portfolio endpoints
  async getPortfolio(): Promise<PortfolioItem[]> {
  return this.request<PortfolioItem[]>('/api/portfolio-sheet/');
}

  async addPortfolioItem(item: Omit<PortfolioItem, 'id' | 'created_at'>, apiKey: string): Promise<{ message: string; id: number }> {
    return this.request<{ message: string; id: number }>('/api/portfolio/', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
      },
      body: JSON.stringify(item),
    });
  }

  async updatePortfolioItem(id: number, item: Partial<PortfolioItem>, apiKey: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/api/portfolio/${id}`, {
      method: 'PUT',
      headers: {
        'x-api-key': apiKey,
      },
      body: JSON.stringify(item),
    });
  }

  async deletePortfolioItem(id: number, apiKey: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/api/portfolio/${id}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': apiKey,
      },
    });
  }

  // Contact endpoints
  async sendContactMessage(message: ContactMessage): Promise<{ message: string }> {
    return this.request<{ message: string }>('/api/contact/', {
      method: 'POST',
      body: JSON.stringify(message),
    });
  }
}

export const apiService = new ApiService();
