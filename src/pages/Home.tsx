import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import Section from '../components/Section'
import Tag from '../components/Tag'
import { initialProjects, profile, skills } from '../data/portfolio'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { Project } from '../types'

export default function Home() {
  const [projects] = useLocalStorage<Project[]>('junik-projects', initialProjects)
  const navigate = useNavigate()

  return (
    <>
      <Section>
        <p className="mb-3 text-ink/70">{profile.role}</p>
        <h1 className="max-w-3xl text-5xl font-bold leading-tight sm:text-7xl">Hi, I'm {profile.name}.</h1>
        <p className="mt-6 max-w-xl text-lg text-ink/75">{profile.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/projects">See my work</Button>
          <Button variant="secondary" to="/contact">Get in touch</Button>
        </div>
      </Section>

      <Section title="Featured projects">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <Card
              key={p.id}
              title={p.title}
              description={p.description}
              tags={[p.category, ...p.tags]}
              onClick={() => navigate('/projects')}
            />
          ))}
        </div>
      </Section>

      <Section title="Skills">
        <div className="flex flex-wrap gap-2">{skills.map((s) => <Tag key={s}>{s}</Tag>)}</div>
      </Section>
    </>
  )
}