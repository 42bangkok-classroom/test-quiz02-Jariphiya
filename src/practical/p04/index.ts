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

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface UserWithTodos {
  id: number;
  name: string;
  address: Address | null;
  phone: string;
  todos: Todo[];
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

export async function getTodosByUserId(id: number): Promise<UserWithTodos | string> {
  try {
    const [usersResponse, todosResponse] = await Promise.all([
      axios.get<ApiUser[]>('https://jsonplaceholder.typicode.com/users'),
      axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
    ]);
    
    const users = usersResponse.data;
    const todos = todosResponse.data;
    
    const user = users.find((user) => user.id === id);
    
    if (!user) {
      return "Invalid id";
    }
    
    const userTodos = todos.filter((todo) => todo.userId === id);
    
    return {
      id: user.id,
      name: user.name,
      address: user.address ? {
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
        zipcode: user.address.zipcode,
        geo: {
          lat: user.address.geo.lat,
          lng: user.address.geo.lng
        }
      } : null,
      phone: user.phone,
      todos: userTodos
    };
  } catch (error) {
    return "Invalid id";
  }
}
