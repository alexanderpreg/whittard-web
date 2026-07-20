export interface ContactChannel {
  iconUrl: string;
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
}

export interface ContactPageData {
  channels: ContactChannel[];
}
