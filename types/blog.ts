export interface BlogPost {
  id?: number;
  url?: string;
  discussionUrl?: string;
  bodyText: string;
  tags: string[]; // array of strings
  createdAt: string;
  title: string;
  bodyHTML?: string;
  html?: string;
  lastEdited?: string | null;
  author: {
    name: string;
    avatar: string;
    url: string;
  };
}
export interface BlogDetail {
  title: string;
  bodyHTML: string;
  createdAt: string;
  author: {
    name: string;
    avatar: string;
    url: string;
  };
}
