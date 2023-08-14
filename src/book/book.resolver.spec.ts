import { Test, TestingModule } from '@nestjs/testing';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';

describe('BooksResolver', () => {
  let resolver: BookResolver;
  let bookService: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookResolver, BookService],
    }).compile();

    resolver = module.get<BookResolver>(BookResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('books', () => {
    it('should return an array of books', async () => {
      const result = [{ id: '1', author: 'Whiskers', title: 'TESt' }];
      jest.spyOn(bookService, 'findAll').mockResolvedValue(result);

      expect(await bookService.findAll()).toBe(result);
    });
  });
});
