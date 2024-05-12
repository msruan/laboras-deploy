export interface IProfile {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  profile_image_link?: string; 
  bio?: string;
}

export type ProfileRequest = {
  id: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  password?: string;
  bio?: string;
  profile_image_link?: string;
};
