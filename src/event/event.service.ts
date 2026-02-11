import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from "./event.entity";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepo: Repository<Event>
  ) {}

  create(createEventDto: CreateEventDto) {
    const event = this.eventsRepo.create(createEventDto);
    return this.eventsRepo.save(event);
  }

  findAll() {
    return this.eventsRepo.find();
  }

  async findOne(id: number) {
    const event = await this.eventsRepo.findOneBy({ id });
    if (!event) {
      throw new NotFoundException("event not found");
    }
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.eventsRepo.preload({ id, ...updateEventDto });
    if (!event) {
      throw new NotFoundException("event not found");
    }
    return this.eventsRepo.save(event);
  }

  async remove(id: number) {
    const event = await this.findOne(id);
    return this.eventsRepo.remove(event);
  }
}
