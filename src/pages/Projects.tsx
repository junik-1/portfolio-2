import { useState } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import Modal from '../components/Modal'
import ProjectForm from '../components/ProjectForm'
import Section from '../components/Section'
import Tag from '../components/Tag'
import { initialProjects } from '../data/portfolio'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { Project, ProjectInput } from '../types'

export default function Projects() {
  const [projects, setProjects] = useLocalStorage<Project[]>('junik-projects', initialProjects)
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<Project | null>(null)
  const [editing, setEditing] = useState<Project | 'new' | null>(null)

  const categories = ['All', ...new Set(projects.map((p) => p.category))]
  const activeFilter = categories.includes(filter) ? filter : 'All'
  const visible = activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter)

  function saveProject(data: ProjectInput) {
    if (editing === 'new') setProjects([...projects, { ...data, id: Date.now() }])
    else if (editing) setProjects(projects.map((p) => (p.id === editing.id ? { ...p, ...data } : p)))
    setEditing(null)
  }

  function deleteProject(project: Project) {
    if (!window.confirm(`Delete "${project.title}"?`)) return
    setProjects(projects.filter((p) => p.id !== project.id))
    setSelected(null)
  }

  return (
    <Section title="Projects">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Button key={c} variant="secondary" active={activeFilter === c} onClick={() => setFilter(c)}>{c}</Button>
          ))}
        </div>
        <Button onClick={() => setEditing('new')}>Add project</Button>
      </div>

      {visible.length === 0 ? (
        <p className="text-ink/70">No projects yet. Click "Add project" to create one.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <Card key={p.id} title={p.title} description={p.description} tags={[p.category, ...p.tags]} onClick={() => setSelected(p)} />
          ))}
        </div>
      )}

      <Modal open={selected !== null} onClose={() => setSelected(null)} title={selected?.title ?? ''}>
        {selected && (
          <>
            <p>{selected.details}</p>
            <div className="flex flex-wrap gap-2">{[selected.category, ...selected.tags].map((t) => <Tag key={t}>{t}</Tag>)}</div>
            <div className="flex flex-wrap gap-2">
              {selected.link && <Button href={selected.link} target="_blank" rel="noreferrer">View project</Button>}
              <Button variant="secondary" onClick={() => { setEditing(selected); setSelected(null) }}>Edit</Button>
              <Button variant="danger" onClick={() => deleteProject(selected)}>Delete</Button>
            </div>
          </>
        )}
      </Modal>

      <Modal open={editing !== null} onClose={() => setEditing(null)} title={editing === 'new' ? 'Add project' : 'Edit project'} showClose={false}>
        {editing !== null && (
          <ProjectForm
            initial={editing === 'new' ? undefined : editing}
            categories={categories.filter((c) => c !== 'All')}
            onSave={saveProject}
            onCancel={() => setEditing(null)}
          />
        )}
      </Modal>
    </Section>
  )
}