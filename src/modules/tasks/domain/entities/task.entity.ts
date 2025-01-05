import { Image } from "@common/interfaces";

export class TaskEntity {
  public readonly id?: string;
  public readonly boardId: string;
  public readonly title: string;
  public readonly desc?: string;
  public readonly status: string;
  public readonly tags: string[];
  public readonly priority: string;
  public readonly assign: Array<{ username: string; image: Image }>;
  public readonly image?: Image;
  public readonly category?: string;
  public readonly pages?: string;
  public readonly messageCount?: string;
  public readonly link?: string;
  public readonly date?: string;
  public readonly time?: string;
  public readonly list: Array<{ id: string; title: string }>;
  public readonly createdAt: string;
  public readonly updatedAt: string;

  constructor({
    id,
    boardId,
    title,
    desc,
    status = 'inprogress',
    tags = [],
    priority = 'low',
    assign = [],
    image,
    category,
    pages,
    messageCount,
    link,
    date,
    time,
    list = [],
    createdAt,
    updatedAt,
  }: Partial<TaskEntity>) {
    this.id = id;
    this.boardId = boardId;
    this.title = title;
    this.desc = desc;
    this.status = status;
    this.tags = tags;
    this.priority = priority;
    this.assign = assign;
    this.image = image;
    this.category = category;
    this.pages = pages;
    this.messageCount = messageCount;
    this.link = link;
    this.date = date;
    this.time = time;
    this.list = list;
    this.createdAt = createdAt || new Date().toISOString();
    this.updatedAt = updatedAt || new Date().toISOString();
  }
}
