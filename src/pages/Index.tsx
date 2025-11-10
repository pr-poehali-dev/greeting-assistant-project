import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

const Index = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
    { role: 'assistant', content: 'Привет! Я AI-ассистент «Лаборатории Идей «Квантум». Чем могу помочь? 😊' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    setMessages([...messages, { role: 'user', content: inputValue }]);
    
    setTimeout(() => {
      const responses = [
        'Отличный вопрос! Могу подробнее рассказать о наших услугах. Перейдите в раздел «О компании» для деталей 📊',
        'Для получения консультации оставьте ваш email в разделе «Поддержка». Наши специалисты свяжутся с вами в течение часа! 💼',
        'Рад помочь! Посмотрите наш блог — там много интересных статей по вашей теме 📝',
        'Спасибо за интерес к «Квантуму»! Напишите подробнее, чем я могу быть полезен? 🚀'
      ];
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: responses[Math.floor(Math.random() * responses.length)]
      }]);
    }, 800);
    
    setInputValue('');
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 animate-pulse-glow" />
        
        <div className="container mx-auto relative z-10">
          <div className="text-center animate-fade-in-up">
            <Badge className="mb-6 text-lg px-4 py-2 bg-primary/20 border-primary">
              <Icon name="Sparkles" size={20} className="mr-2" />
              Инновации будущего
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Лаборатория Идей «Квантум»
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Превращаем смелые идеи в революционные технологии. Разработка, консалтинг, инновации.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8">
                <Icon name="Rocket" size={20} className="mr-2" />
                Начать проект
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-lg px-8">
                <Icon name="PlayCircle" size={20} className="mr-2" />
                Смотреть демо
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={32} className="text-primary" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center animate-fade-in">
            О компании
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'Brain', title: 'AI & ML', desc: 'Машинное обучение и искусственный интеллект для вашего бизнеса' },
              { icon: 'Code', title: 'Разработка', desc: 'Web, mobile и enterprise решения под ключ' },
              { icon: 'Lightbulb', title: 'Консалтинг', desc: 'Стратегия цифровой трансформации и инновации' }
            ].map((item, i) => (
              <Card key={i} className="bg-card border-primary/30 hover:border-primary transition-all hover:scale-105 animate-fade-in" style={{ animationDelay: `${i * 0.2}s` }}>
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4">
                    <Icon name={item.icon as any} size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center">Блог</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Будущее AI в 2025', date: '10 ноября 2024', tag: 'Технологии' },
              { title: 'Квантовые вычисления: прорыв года', date: '5 ноября 2024', tag: 'Наука' },
              { title: 'Кейс: автоматизация завода', date: '1 ноября 2024', tag: 'Кейсы' }
            ].map((post, i) => (
              <Card key={i} className="bg-card border-primary/20 hover:border-secondary transition-all cursor-pointer hover:scale-105">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{post.tag}</Badge>
                    <span className="text-sm text-muted-foreground">{post.date}</span>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-primary hover:text-secondary transition-colors">
                    Читать далее
                    <Icon name="ArrowRight" size={18} className="ml-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-5xl font-bold mb-12 text-center">Поддержка</h2>
          
          <Card className="bg-card border-primary/30">
            <CardHeader>
              <CardTitle className="text-2xl">Свяжитесь с нами</CardTitle>
              <p className="text-muted-foreground">Наша команда готова ответить на любые вопросы</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground">info@quantum-lab.ru</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" size={24} className="text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Телефон</h3>
                  <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Офис</h3>
                  <p className="text-muted-foreground">Москва, Инновационный центр «Сколково»</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 Лаборатория Идей «Квантум». Все права защищены.</p>
        </div>
      </footer>

      {/* AI Chat Button */}
      {!chatOpen && (
        <Button
          onClick={() => setChatOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary shadow-2xl animate-pulse-glow z-50"
        >
          <Icon name="MessageCircle" size={28} />
        </Button>
      )}

      {/* AI Chat Window */}
      {chatOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl border-primary z-50 flex flex-col animate-scale-in">
          <CardHeader className="bg-gradient-to-r from-primary to-secondary rounded-t-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="Bot" size={24} className="text-white" />
                </div>
                <div>
                  <CardTitle className="text-white">AI Ассистент</CardTitle>
                  <p className="text-xs text-white/80">Онлайн</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setChatOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
          </CardHeader>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.role === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <CardContent className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Напишите сообщение..."
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                size="icon"
                className="bg-primary hover:bg-primary/90"
              >
                <Icon name="Send" size={20} />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Index;
