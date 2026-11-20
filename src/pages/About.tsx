import Card from '../components/Card'
import Section from '../components/Section'
import Tag from '../components/Tag'
import { profile, skills } from '../data/portfolio'

export default function About() {
  return (
    <Section title={`About ${profile.name}`}>
      <div className="grid gap-5 md:grid-cols-2">
        <Card title="My story">
          <p className="text-sm leading-relaxed text-ink/70">
            Write a few sentences here about who you are, what you do, and what you care about.
          </p>
        </Card>
        <Card title="What I work with">
          <div className="flex flex-wrap gap-2">{skills.map((s) => <Tag key={s}>{s}</Tag>)}</div>
        </Card>
      </div>
    </Section>
  )
}