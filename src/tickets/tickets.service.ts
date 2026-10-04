import { Injectable, NotFoundException } from '@nestjs/common';
import { Ticket } from './ticket.interface.js';
import { CreateTicketDto } from './dto/create-ticket.dto.js';

@Injectable()
export class TicketsService {
  private readonly tickets: Ticket[] = [
    {
      id: 1,
      subject: 'Unable to log in',
      description:
        'I cannot log in to my account even with the correct credentials.',
      priority: 'high',
      status: 'open',
      createdAt: '2026-10-01T09:30:00Z',
    },
    {
      id: 2,
      subject: 'Payment failed',
      description:
        'My payment failed, but the amount was deducted from my account.',
      priority: 'high',
      status: 'open',
      createdAt: '2026-10-02T11:15:00Z',
    },
    {
      id: 3,
      subject: 'Update profile information',
      description: 'I need help updating my profile information.',
      priority: 'low',
      status: 'closed',
      createdAt: '2026-10-02T14:45:00Z',
    },
    {
      id: 4,
      subject: 'Slow application performance',
      description:
        'The application takes too long to load pages and respond to actions.',
      priority: 'medium',
      status: 'open',
      createdAt: '2026-10-03T08:20:00Z',
    },
    {
      id: 5,
      subject: 'Password reset issue',
      description: 'I am not receiving the password reset email.',
      priority: 'medium',
      status: 'closed',
      createdAt: '2026-10-04T04:00:00Z',
    },
  ];

  private nextId = 6;

  findAll({
    status,
    priority,
  }: {
    status?: Ticket['status'];
    priority?: Ticket['priority'];
  }) {
    let tickets = this.tickets;
    if (status) {
      tickets = tickets.filter((ticket) => ticket.status === status);
    }
    if (priority) {
      tickets = tickets.filter((ticket) => ticket.priority === priority);
    }
    return tickets;
  }

  findOne(id: number) {
    const ticket = this.tickets.find((i) => i.id === id);
    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${id} not found`);
    }
    return ticket;
  }

  create(createTicketDto: CreateTicketDto) {
    const ticket: Ticket = {
      id: this.nextId++,
      subject: createTicketDto.subject,
      description: createTicketDto.description,
      priority: createTicketDto.priority,
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    this.tickets.push(ticket);
    return ticket;
  }
}
