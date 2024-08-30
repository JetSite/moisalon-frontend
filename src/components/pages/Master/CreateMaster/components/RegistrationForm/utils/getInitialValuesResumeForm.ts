import { IResume } from 'src/types/masters'

interface IInitialInput {
  resume_title: string
  resume_specialization: string
  resume_age: string
  resume_workSchedule: string
  resume_salary: string
  resume_city: string
  resume_content: string
}

export interface IInitialValuesResumeForm extends IInitialInput {
  resume_checkCart: boolean
}

export type IgetInitialValuesResumeForm = (
  resume: IResume | null,
) => IInitialValuesResumeForm

export const getInitialValuesResumeForm: IgetInitialValuesResumeForm =
  resume => {
    const initialInput: IInitialInput = resume
      ? {
          resume_title: resume.title,
          resume_content: resume.content || '',
          resume_specialization: resume.specialization || '',
          resume_age: resume.age.toString() || '',
          resume_workSchedule: resume.workSchedule || '',
          resume_salary: resume.salary || '',
          resume_city: resume.city.name || resume.city.slug || '',
        }
      : {
          resume_title: '',
          resume_content: '',
          resume_specialization: '',
          resume_age: '',
          resume_workSchedule: '',
          resume_salary: '',
          resume_city: '',
        }

    const result: IInitialValuesResumeForm = {
      ...initialInput,
      resume_checkCart: true,
    }

    return result
  }
