

export interface Ticket {
  id: string;
  number: number;
  createdAt: Date;
  handleAtDesk?: string; // Determinar escritorio
  handleAt?: Date;
  done: boolean;
}