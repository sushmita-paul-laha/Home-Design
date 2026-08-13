import { Project } from './project.model';

export interface Designer {
  id: number;
  name: string;
  profileImage: string;
  experience: string;
  rating: number;
  projectsCompleted: number;
  states: string[];
  specialization: string[];
  description: string;
  projects: Project[];
}
