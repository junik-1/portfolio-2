// The shape of the data. TypeScript will warn you if a project is missing a field.
export type Project = {
  id: number
  title: string
  category: string
  description: string
  details: string
  tags: string[]
  link: string
}

// A project before it has an id (what the form produces).
export type ProjectInput = Omit<Project, 'id'>

export type Profile = {
  name: string
  role: string
  intro: string
  email: string
  photo: string
  links: { label: string; href: string }[]
}