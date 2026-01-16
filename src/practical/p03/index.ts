import axios from 'axios';

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface UserInput {
  id: number;
  name: string;
  phone: string;
  address: Address | null;
}

interface ApiUser {
  id: number;
  name: string;
  phone: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export async function filterUserById(id: number): Promise<UserInput | string> {
  try {
    const response = await axios.get<ApiUser[]>('https://jsonplaceholder.typicode.com/users');
    const users = response.data;
    
    const user = users.find((user) => user.id === id);
    
    if (!user) {
      return "Invalid id";
    }
    
    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address ? {
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
        zipcode: user.address.zipcode,
        geo: {
          lat: user.address.geo.lat,
          lng: user.address.geo.lng
        }
      } : null
    };
  } catch (error) {
    return "Invalid id";
  }
}
