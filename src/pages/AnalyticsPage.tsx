
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { BarChart, Download, PieChart, Filter, Share } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  BarChart as RechartsBarChart,
  Bar
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const participantsData = [
  { month: 'Янв', count: 45 },
  { month: 'Фев', count: 78 },
  { month: 'Мар', count: 103 },
  { month: 'Апр', count: 142 },
  { month: 'Май', count: 187 },
  { month: 'Июн', count: 210 },
  { month: 'Июл', count: 185 },
  { month: 'Авг', count: 192 },
  { month: 'Сен', count: 254 },
  { month: 'Окт', count: 286 },
  { month: 'Ноя', count: 305 },
  { month: 'Дек', count: 337 }
];

const profileData = [
  { name: 'Математика', value: 145 },
  { name: 'Информатика', value: 87 },
  { name: 'Физика', value: 62 },
  { name: 'Химия', value: 54 },
  { name: 'Биология', value: 78 },
  { name: 'Другие', value: 49 }
];

const stageData = [
  { name: 'Школьный', участники: 425 },
  { name: 'Муниципальный', участники: 215 },
  { name: 'Региональный', участники: 87 },
  { name: 'Заключительный', участники: 23 }
];

const municipalityData = [
  { name: 'Северный район', value: 158 },
  { name: 'Центральный район', value: 210 },
  { name: 'Южный район', value: 124 },
  { name: 'Восточный район', value: 97 },
  { name: 'Западный район', value: 142 }
];

const eventTypeData = [
  { name: 'Олимпиады', 'Количество': 28, 'Участники': 542 },
  { name: 'Конкурсы', 'Количество': 14, 'Участники': 315 },
  { name: 'Конференции', 'Количество': 8, 'Участники': 187 },
  { name: 'Форумы', 'Количество': 5, 'Участники': 122 },
  { name: 'Семинары', 'Количество': 12, 'Участники': 98 }
];

const ageData = [
  { name: '7-10 лет', value: 185 },
  { name: '11-14 лет', value: 365 },
  { name: '15-16 лет', value: 428 },
  { name: '17-18 лет', value: 269 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AnalyticsPage: React.FC = () => {
  const { toast } = useToast();
  const [period, setPeriod] = useState("year");
  const [dataType, setDataType] = useState("participants");
  const [activeTab, setActiveTab] = useState("overview");

  const handleExport = () => {
    toast({
      title: "Экспорт данных",
      description: "Аналитические данные успешно экспортированы"
    });
  };

  const handleShare = () => {
    toast({
      title: "Поделиться отчетом",
      description: "Отчет доступен для совместного просмотра"
    });
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center">
          <BarChart className="h-6 w-6 text-bank-blue mr-2" />
          <h1 className="text-2xl font-bold">Аналитика</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => {}}>
            <Filter className="h-4 w-4 mr-2" />
            Фильтры
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share className="h-4 w-4 mr-2" />
            Поделиться
          </Button>
          <Button onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Экспорт данных
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Общий обзор</TabsTrigger>
          <TabsTrigger value="participants">Участники</TabsTrigger>
          <TabsTrigger value="events">Мероприятия</TabsTrigger>
          <TabsTrigger value="locations">География</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="col-span-1 hover:border-bank-blue transition-colors cursor-pointer bg-gradient-to-br from-bank-light-blue/30 to-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Участники</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,247</div>
                <p className="text-sm text-muted-foreground">Общее количество зарегистрированных участников</p>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 hover:border-bank-blue transition-colors cursor-pointer bg-gradient-to-br from-bank-light-blue/30 to-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Наставники</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">156</div>
                <p className="text-sm text-muted-foreground">Всего наставников в системе</p>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 hover:border-bank-blue transition-colors cursor-pointer bg-gradient-to-br from-bank-light-blue/30 to-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Олимпиады</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">28</div>
                <p className="text-sm text-muted-foreground">Завершенные олимпиады за год</p>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 hover:border-bank-blue transition-colors cursor-pointer bg-gradient-to-br from-bank-light-blue/30 to-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Конкурсы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">14</div>
                <p className="text-sm text-muted-foreground">Проведенные конкурсы за год</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Динамика роста участников</CardTitle>
                      <CardDescription>Количество участников проекта по месяцам</CardDescription>
                    </div>
                    <Select value={period} onValueChange={setPeriod}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="month">За месяц</SelectItem>
                        <SelectItem value="quarter">За квартал</SelectItem>
                        <SelectItem value="year">За год</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={participantsData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="count" 
                          stroke="#3b82f6" 
                          fillOpacity={1} 
                          fill="url(#colorCount)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Распределение по профилям</CardTitle>
                      <CardDescription>
                        Участники по профилям мероприятий
                      </CardDescription>
                    </div>
                    <Select value={dataType} onValueChange={setDataType}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="participants">Участники</SelectItem>
                        <SelectItem value="municipalities">Муниципалитеты</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                        <Pie
                          data={dataType === "participants" ? profileData : municipalityData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={renderCustomizedLabel}
                        >
                          {(dataType === "participants" ? profileData : municipalityData).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend 
                          layout="horizontal" 
                          verticalAlign="bottom" 
                          align="center" 
                          wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                        />
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="participants">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Распределение по возрасту</CardTitle>
                <CardDescription>Участники по возрастным группам</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={ageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={renderCustomizedLabel}
                    >
                      {ageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Топ активных муниципалитетов</CardTitle>
                <CardDescription>По количеству участников</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={municipalityData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      width={120}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip />
                    <Bar dataKey="value" name="Участников" fill="#3b82f6" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="events">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Распределение по типам мероприятий</CardTitle>
                <CardDescription>Количество и участники</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={eventTypeData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="Количество" name="Количество мероприятий" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="Участники" name="Количество участников" fill="#82ca9d" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Распределение по уровням</CardTitle>
                <CardDescription>Участие в мероприятиях по уровням проведения</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={stageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="участники"
                      nameKey="name"
                      label={renderCustomizedLabel}
                    >
                      {stageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="locations">
          <Card className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold mb-2">Географическое распределение участников</h2>
              <p className="text-muted-foreground">Интерактивная карта с распределением участников по регионам</p>
            </div>
            <div className="bg-gray-100 rounded-xl border border-dashed border-gray-300 h-[400px] flex items-center justify-center">
              <div className="text-center">
                <BarChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">Здесь будет отображаться интерактивная карта</p>
                <p className="text-sm text-gray-400">с распределением участников по регионам</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-bank-light-blue/20 p-4 rounded-lg">
                <div className="font-semibold text-lg">5 регионов</div>
                <div className="text-sm text-gray-600">Представлены в системе</div>
              </div>
              <div className="bg-bank-light-blue/20 p-4 rounded-lg">
                <div className="font-semibold text-lg">42 школы</div>
                <div className="text-sm text-gray-600">Из разных регионов</div>
              </div>
              <div className="bg-bank-light-blue/20 p-4 rounded-lg">
                <div className="font-semibold text-lg">8 муниципалитетов</div>
                <div className="text-sm text-gray-600">Участвуют в проекте</div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Распределение по уровням</CardTitle>
          <CardDescription>
            Участие в мероприятиях по уровням проведения
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={stageData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="участники" fill="#3b82f6" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
