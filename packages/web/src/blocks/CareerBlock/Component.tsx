import React, { useState, useEffect } from 'react'
import { payloadClient } from '@/lib/payload-client'
import { FormBlock } from '../Form/Component'
import { Media } from '@/components/Media'
import { PlaceholderCard } from '@/components/PlaceholderCard'

export type CareerBlockType = {
  blockType: 'careerBlock'
  title?: string
  description?: string
  form: unknown
}

type Dept = { id: string | number; name: string; description?: string }
type Member = {
  id: string | number
  name: string
  role?: string
  image?: unknown
  department?: { id: string | number } | string | number
}

export const CareerBlock: React.FC<CareerBlockType> = ({ title, description, form }) => {
  const [departments, setDepartments] = useState<Dept[]>([])
  const [teamMembers, setTeamMembers] = useState<Member[]>([])
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    Promise.all([
      payloadClient.find('departments', { limit: 100, sort: 'name' }),
      payloadClient.find('team', { limit: 100, depth: 1 }),
    ])
      .then(([deptResult, teamResult]) => {
        setDepartments(deptResult.docs as Dept[])
        setTeamMembers(teamResult.docs as Member[])
      })
      .catch((err) => console.error('Failed to fetch career data:', err))
      .finally(() => setFetched(true))
  }, [])

  const isEmpty = fetched && departments.length === 0

  return (
    <div className="container">
      <div className="max-w-2xl mb-12">
        {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
        {description && <p className="text-lg text-muted-foreground">{description}</p>}
      </div>

      {isEmpty ? (
        <div className="mb-20">
          <PlaceholderCard
            title={title || 'Careers Placeholder Title'}
            description={
              description ||
              'Careers Placeholder Text — add Departments and Team members in the Payload admin and they will appear here.'
            }
          />
        </div>
      ) : (
        <div className="flex flex-col gap-16 mb-20">
          {departments.map((dept, i) => {
            const deptTeam = teamMembers.filter(
              (member) =>
                (typeof member.department === 'object' && member.department !== null
                  ? member.department.id
                  : member.department) === dept.id,
            )

            return (
              <div key={i} className="flex flex-col gap-8">
                <div className="border-b border-border pb-4">
                  <h3 className="text-2xl font-bold">{dept.name}</h3>
                  {dept.description && (
                    <p className="text-muted-foreground mt-2">{dept.description}</p>
                  )}
                </div>

                {deptTeam.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {deptTeam.map((member, j) => (
                      <div key={j} className="flex flex-col gap-3">
                        <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
                          <Media resource={member.image} fill className="object-cover" />
                        </div>
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No team members in this department yet.
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}

      <div className="max-w-2xl mx-auto border border-border p-8 rounded-xl bg-card">
        <h3 className="text-2xl font-semibold mb-6 text-center">Inquire / Apply for a Role</h3>
        <FormBlock enableIntro={false} form={form as never} />
      </div>
    </div>
  )
}
