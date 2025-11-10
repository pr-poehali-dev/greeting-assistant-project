import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    setTimeout(() => {
      const mockResponses = [
        'Это интересный вопрос! Давайте разберём его подробнее.\n\nВо-первых, важно понимать контекст. Во-вторых, нужно учитывать различные факторы, которые могут влиять на ситуацию.\n\nЧто именно вас интересует больше всего?',
        'Я могу помочь вам с этим! Вот несколько ключевых моментов:\n\n1. Первое важное соображение\n2. Второй аспект, который стоит учесть\n3. Третий момент для размышления\n\nЕсть ли у вас дополнительные вопросы по этой теме?',
        'Отличный вопрос! Это действительно актуальная тема.\n\nМогу предложить следующий подход: начните с основ, затем постепенно углубляйтесь в детали. Важно не торопиться и усваивать информацию последовательно.\n\nЧем ещё я могу вам помочь?',
        'Понимаю вашу задачу. Вот что я могу предложить:\n\n**Вариант А**: Более простой и быстрый путь\n**Вариант Б**: Более сложный, но надёжный подход\n\nКакой вариант вам ближе?',
        'Спасибо за вопрос! Это требует комплексного анализа.\n\nС одной стороны, есть очевидные преимущества. С другой стороны, нужно учитывать потенциальные риски.\n\nДавайте обсудим это более детально?'
      ];

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)]
      }]);
      setIsLoading(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const examplePrompts = [
    'Объясни квантовую физику простыми словами',
    'Как создать стартап с нуля?',
    'Напиши стихотворение про космос',
    'Помоги составить план обучения Python'
  ];

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="Bot" size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Quantum AI</h1>
            <p className="text-xs text-muted-foreground">Умный ассистент для любых задач</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-primary/50">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Онлайн
          </Badge>
          <Button variant="ghost" size="icon">
            <Icon name="Settings" size={20} />
          </Button>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollRef}>
          <div className="max-w-3xl mx-auto px-4 py-8">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
                <div className="w-20 h-20 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl flex items-center justify-center mb-6 animate-pulse-glow">
                  <Icon name="Sparkles" size={40} className="text-white" />
                </div>
                
                <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Чем могу помочь?
                </h2>
                
                <p className="text-muted-foreground text-center mb-8 max-w-md">
                  Задавайте любые вопросы: от программирования до философии. Готов обсудить всё что угодно!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                  {examplePrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => setInputValue(prompt)}
                      className="p-4 bg-card border border-border rounded-xl text-left hover:border-primary transition-all hover:scale-105 animate-fade-in"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div className="flex items-start gap-3">
                        <Icon name="Lightbulb" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{prompt}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-4 animate-fade-in ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Bot" size={18} className="text-white" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                        msg.role === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-card border border-border'
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {msg.content}
                      </div>
                    </div>

                    {msg.role === 'user' && (
                      <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="User" size={18} />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-4 animate-fade-in">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Bot" size={18} className="text-white" />
                    </div>
                    <div className="bg-card border border-border rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="relative flex items-end gap-2">
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Напишите сообщение... (Enter для отправки)"
              className="min-h-[60px] max-h-[200px] resize-none pr-12 bg-card"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              size="icon"
              className="absolute right-2 bottom-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              <Icon name="Send" size={20} />
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Quantum AI может совершать ошибки. Проверяйте важную информацию.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
