import {
  Body,
  Controller,
  Header,
  HttpStatus,
  Post,
  Req,
  Res,
  Sse,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, interval, map } from 'rxjs';

@Controller('chat')
export class ChatgptController {
  @Post('stream')
  // sse: server send event
  async eventStream(
    @Body() body: { id: string; content: string },
    @Res() res: Response,
  ) {
    const { content, id } = body;

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.flushHeaders();

    res.status(HttpStatus.OK);

    const mockResult = [
      '下面是用 Go 实现的快速排序算法，用递归方式实现：',
      '',
      '```go\n',
      'package main\n',
      '',
      'import "fmt"\n',
      '',
      'func quickSort(arr []int) []int {',
      'if len(arr) <= 1 {',
      'return arr',
      '}',
      '',
      'pivot := arr[0]',
      'var left, right []int',
      'for _, value := range arr[1:] {',
      'if value <= pivot {',
      'left = append(left, value)',
      '} else {',
      'right = append(right, value)',
      '}',
      '}',
      '',
      'left = quickSort(left)',
      'right = quickSort(right)',
      '',
      'return append(append(left, pivot), right...)',
      '}',
      '',
      'func main() {',
      'arr := []int{5, 2, 1, 9, 7, 6, 8, 3, 4}',
      'arr = quickSort(arr)',
      'fmt.Println(arr)',
      '}',
      '```',
      '',
      '首先定义了一个 `quickSort` 函数，输入为一个整数类型的数组，返回一个经过快速排序后的数组。在函数的开头进行了数组长度的判断，如果长度小于等于 1，则返回原数组。\n',
      '',
      '然后选择数组中的第一个元素作为基准值，遍历数组中的其他元素，如果元素小于等于基准值，则将其放入 left 数组，否则放入 right 数组。\n',
      '',
      '最后递归调用 `quickSort` 函数对 left 和 right 数组进行快速排序，然后将 left、pivot 和 right 拼接起来，返回最终的排好序的数组。\n',
      '',
      '最后在 main 函数中定义一个数组，调用 quickSort 方法对其进行排序，并输出排序后的数组。\n',
    ];

    for (const item of mockResult) {
      res.write(`id: ${id}\n\ndata: ${item}\n`);
      await new Promise((resolve) => setTimeout(resolve, 50)); // 等待 1s
    }

    res.write(`id: ${id}\n\ndata: [DONE] \n\n`);

    res.on('close', () => {
      console.log('closed');
    });
  }
}
