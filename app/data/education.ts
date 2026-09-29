export interface EducationEntry {
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  location: string
}

export const education: EducationEntry[] = [
  {
    institution: 'De La Salle University',
    degree: 'Master of Science',
    field: 'Computer Science',
    startDate: '2017',
    endDate: '2018',
    location: 'Manila, Philippines'
  },
  {
    institution: 'Notre Dame of Dadiangas University',
    degree: 'Bachelor of Science',
    field: 'Information Technology',
    startDate: '2012',
    endDate: '2016',
    location: 'General Santos City, Philippines'
  }
]
