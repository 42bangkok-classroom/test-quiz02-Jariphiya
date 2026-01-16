import axios from 'axios'
interface Geo {
  lat: string
  lng: string
}

interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

interface UserInput {
  id: number
  name: string
  phone: string
  address: Address | null
}

interface ApiUser {
  id: number
  name: string
  phone: string
  address?: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
}

type newUser = {
  name: string;
  username?: string;
  email?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  } | null;
  phone: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};
export async function addUser(newUser: newUser | null): Promise<UserInput[]> {
  try {
    const response = await axios.get<ApiUser[]>('https://jsonplaceholder.typicode.com/users')
    const users = response.data


    const mappedUser: UserInput[] = users.map((usersss) => ({
      id: usersss.id,
      name: usersss.name,
      phone: usersss.phone,
      address: usersss.address ? {
      street: usersss.address.street,
      suite: usersss.address.suite,
      city: usersss.address.city,
      zipcode: usersss.address.zipcode,
      geo: {
        lat: usersss.address.geo.lat,
        lng: usersss.address.geo.lng
      }
    } : null
  }))

  if(!newUser){
    return mappedUser;
  }
  const newUserData
}


}
