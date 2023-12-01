export interface TextForm {
  id: string;
  date: string;
  title: string;
  text: string;
}

export interface TextData {
  textForm: TextForm;
}
export interface ContactData {
  country: string;
  from: string;
  address: string;
  home: string;
  phoneNumber: string;
  email: string;
}

export interface AboutData{
  name: string;
  lastName: string;
  hobby: string;
  game: string;
  group: string;
  book: string;
}