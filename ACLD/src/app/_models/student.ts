import marks from './marks';
export interface Student {
  studentId: string,
  name: string,
  sex: string,
  grade: number,
  marks: marks,
  hobby: string
}
