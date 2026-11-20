import Button from '../components/Button'
import Card from '../components/Card'
import Section from '../components/Section'
import { profile } from '../data/portfolio'

export default function Contact() {
  return (
    <Section title="Contact">
      <Card title="Let's work together" description="Send a message and I'll reply as soon as I can.">
        <div className="flex flex-wrap gap-3 pt-2">
          <Button href={`mailto:${profile.email}`}>Email {profile.name}</Button>
          {profile.links.map((l) => (
            <Button key={l.label} variant="secondary" href={l.href} target="_blank" rel="noreferrer">{l.label}</Button>
          ))}
        </div>
      </Card>
    </Section>
  )
}