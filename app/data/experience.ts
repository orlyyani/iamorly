// First day at Mynd Consulting -- the start of Orly's professional career,
// used to compute "years of experience" dynamically.
export const careerStartDate = new Date(2016, 3, 1)

export interface ExperienceEntry {
  id: string
  company: string
  logo?: string
  role: string
  roleDetail?: string
  employmentType?: string
  startDate: string
  endDate: string
  duration: string
  location: string
  description: string
  skills?: string[]
  skillsMore?: number
}

export const experience: ExperienceEntry[] = [
  {
    id: 'appetiser',
    company: 'Appetiser Pty Ltd',
    role: 'Web Developer',
    startDate: 'Jul 2018',
    endDate: 'Present',
    duration: '8 yrs',
    location: '9/85 Dover Street Cremorne, Victoria, Australia',
    description: 'By joining Appetiser Apps, a prominent company founded by Michael MacRae and Jamie Shostak, based in Australia, I was able to enhance my skills as a developer. Since joining the company in 2018, I have had the opportunity to work on a flexible basis and have made significant progress as a developer. I have collaborated with various teams to develop several web applications. Appetiser Apps has seen millions of downloads and boasts clients with billions in value.'
  },
  {
    id: 'lumea',
    company: 'Lumea',
    role: 'Full-stack Developer',
    employmentType: 'Full-time',
    startDate: 'Dec 2021',
    endDate: 'Feb 2024',
    duration: '2 yrs 3 mos',
    location: 'Utah, United States · Remote',
    description: 'During my tenure at Lumea, I served as a Front-end engineer specializing in VueJS 3. Our primary focus was the development of BxLink, an application designed to seamlessly integrate with various devices to enhance the experience of pathologists. This platform also facilitates the dissemination of information to clinicians in ways previously unattainable. BxLink empowers pathologists to customize their dashboards, streamline their daily workflows, expedite the sign-out process, and soon, automatically incorporate tailored report language based on user preferences. Subsequently, I transitioned to the BackEnd team to assist with maintenance tasks while continuing my involvement in Front-end development. Within this role, I contributed to the upkeep of both the Legacy and New UIs of the BxLink application.',
    skills: ['Full-Stack Development', 'Vue.js'],
    skillsMore: 6
  },
  {
    id: 'adaca',
    company: 'Adaca',
    role: 'Web Developer',
    startDate: 'Dec 2021',
    endDate: 'Sep 2023',
    duration: '1 yr 10 mos',
    location: 'Australia · Remote',
    description: 'I have gained experience on a range of projects, including Archistar and PETstock. For Archistar, I have been involved in the creation of custom front-end components using technologies such as StencilJS and popular front-end frameworks such as VueJS and ReactJS. At PETstock, I am part of a large team working on a substantial project, where I have been engaged in full-stack development utilizing CodeIgniter.'
  },
  {
    id: 'mynd-consulting',
    company: 'Mynd Consulting',
    role: 'Web Developer',
    roleDetail: 'Web/UI Designer & Developer | Wordpress Developer | Front end Developer | Web Application Designer',
    startDate: 'Apr 2016',
    endDate: 'Aug 2018',
    duration: '2 yrs 5 mos',
    location: 'G/F AMYA II Building, Quimpo Boulevard corner Tulip Drive, Ecoland Subdivision',
    description: 'Mynd Consulting was an excellent company that provided me with ample opportunities to refine my front-end and UI/UX abilities. I spent nearly two years and five months with the company, starting as a Junior Developer in 2016. Through working with various teams, I was able to gain a wealth of knowledge and experience. Mynd was responsible for the development of the official Dr. Oz app, which was published by Sharecare Inc.'
  }
]
