
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
import { BarChart, Download, PieChart } from "lucide-react";
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AnalyticsPage: React.FC = () => {
  const [period, setPeriod] = useState("year");
  const [dataType, setDataType] = useState("participants");

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
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BarChart className="h-6 w-6 text-bank-blue mr-2" />
          <h1 className="text-2xl font-bold">Аналитика</h1>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Экспорт данных
        </Button>
      </div>
      
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
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
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
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
    </div>
  );
};

export default AnalyticsPage;
