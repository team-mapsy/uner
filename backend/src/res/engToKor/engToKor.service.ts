import { GetWordsRequest } from '@interface/apis/eng-to-kor';
import { WordInterface } from '@interface/types/word';
import { Injectable } from '@nestjs/common';
import { openai } from '@src/utils/config/OpenAI';

@Injectable()
export class EngToKorService {
  async getWords({ level, wordCount, wrongAnswered, liked, topic }: GetWordsRequest) {
    const words: WordInterface[] = [
      {
        id: '1',
        english: 'ephemeral',
        definitions: [
          { id: '7', definition: '수명이 짧은', partOfSpeech: 'adjective' },
          { id: '8', definition: '단명하는', partOfSpeech: 'adjective' },
          { id: '9', definition: '덧없는', partOfSpeech: 'adjective' },
        ],
        difficulty: 5,
        topic: [],
      },
      {
        id: '2',
        english: 'obfuscate',
        definitions: [{ id: '12', definition: '혼란스럽게 만들다', partOfSpeech: 'verb' }],
        difficulty: 5,
        topic: [],
      },
      {
        id: '3',
        english: 'ubiquitous',
        definitions: [
          { id: '10', definition: '어디에나 있는', partOfSpeech: 'adjective' },
          { id: '11', definition: '아주 흔한', partOfSpeech: 'adjective' },
        ],
        difficulty: 5,
        topic: [],
      },
      {
        id: '4',
        english: 'character',
        definitions: [
          { id: '1', definition: '성격', partOfSpeech: 'noun' },
          { id: '2', definition: '특성', partOfSpeech: 'noun' },
          { id: '3', definition: '등장인물', partOfSpeech: 'noun' },
          { id: '4', definition: '배역', partOfSpeech: 'noun' },
        ],
        difficulty: 2,
        topic: [],
      },
      {
        id: '5',
        english: 'gift',
        definitions: [
          { id: '5', definition: '선물', partOfSpeech: 'noun' },
          { id: '6', definition: '재능', partOfSpeech: 'noun' },
        ],
        difficulty: 1,
        topic: [],
      },
    ];
    return { words };
  }

  postAnswer = async (givenWord: string, userPrompt: string) => {
    // if (!givenWord) {
    //   res.status(400).json({ message: '단어가 주어지지 않았습니다' });
    //   return;
    // }
    // if (!userPrompt) {
    //   res.status(400).json({ message: '유저 답변이 주어지지 않았습니다' });
    //   return;
    // }

    const prompt = `영어 단어 : ${givenWord}, 답변 : ${userPrompt}`;

    const response = Promise.resolve({
      choices: [
        {
          message: {
            content: JSON.stringify({
              is_answer: true,
              description: `${userPrompt}는 이렇고 ${givenWord}는 이런데 걍 이래서 답이 맞습니다`,
            }),
          },
        },
      ],
    });

    // TODO : API 절약
    // const response = openai.chat.completions.create({
    //   model: 'gpt-4o-mini',
    //   store: true,
    //   messages: [
    //     {
    //       role: 'system',
    //       content: [
    //         {
    //           type: 'text',
    //           text: `당신은 한국인 학생을 가르치는 영어 교사에요. 주어진 영어 단어와 비교해서 유저가 제시하는 한국어 단어의 뜻을 판단하고, 적절한 한글 뜻이 제시되었는지 판별해주세요.
    //           답변의 json_object 스키마는 boolean 타입의 is_answer와 string 타입의 description으로 이루어져요.
    //           is_answer로는 true / false boolean의 타입으로 유저가 단어의 뜻을 올바르게 해석했는지 적합성 여부를 판별해주세요. 여러 의미를 가진 단어라면 그 중 하나의 뜻만 제시되어도 정답 처리해주세요. 의미가 비슷하더라도 품사가 많이 다르다면 오답 처리해주세요.
    //           description으로는 답안을 판별한 부연설명을 해주세요.`,
    //         },
    //       ],
    //     },
    //     {
    //       role: 'user',
    //       content: prompt,
    //     },
    //   ],
    //   response_format: {
    //     type: 'json_object',
    //   },
    //   temperature: 0.5,
    //   max_completion_tokens: 256,
    //   frequency_penalty: 0,
    //   presence_penalty: 0,
    // });

    const result = await response;
    const answer = result.choices[0].message.content;

    // if (answer === null) {
    //   res.status(400).json({ message: 'GPT가 응답하지 않습니다' });
    //   return;
    // }

    return answer;
  };
}
