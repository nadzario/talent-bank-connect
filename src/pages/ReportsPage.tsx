
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter,
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
import { useToast } from "@/hooks/use-toast";
import { BarChart, Calendar, Download, FileText, PieChart, UserCheck, Users } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const ReportsPage: React.FC = () => {
  const { toast } = useToast();
  const [reportType, setReportType] = useState("participants");
  const [period, setPeriod] = useState("year");

  const handleExportReport = (format: string) => {
    toast({
      title: "Отчет экспортирован",
      description: `Отчет успешно экспортирован в формате ${format}.`
    });
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
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
          <FileText className="h-6 w-6 text-bank-blue mr-2" />
          <h1 className="text-2xl font-bold">Отчеты</h1>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="col-span-1 hover:border-bank-blue transition-colors cursor-pointer bg-gradient-to-br from-bank-light-blue/30 to-white">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Участники</CardTitle>
              <Users className="h-5 w-5 text-bank-blue" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,247</div>
            <p className="text-sm text-muted-foreground">Общее количество участников</p>
          </CardContent>
          <CardFooter className="text-xs text-green-600 flex items-center border-t pt-2">
            +12% с прошлого месяца
          </CardFooter>
        </Card>
        
        <Card className="col-span-1 hover:border-bank-blue transition-colors cursor-pointer bg-gradient-to-br from-bank-light-blue/30 to-white">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Наставники</CardTitle>
              <UserCheck className="h-5 w-5 text-bank-blue" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">156</div>
            <p className="text-sm text-muted-foreground">Общее количество наставников</p>
          </CardContent>
          <CardFooter className="text-xs text-green-600 flex items-center border-t pt-2">
            +5% с прошлого месяца
          </CardFooter>
        </Card>
        
        <Card className="col-span-1 hover:border-bank-blue transition-colors cursor-pointer bg-gradient-to-br from-bank-light-blue/30 to-white">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Проекты</CardTitle>
              <FileText className="h-5 w-5 text-bank-blue" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">36</div>
            <p className="text-sm text-muted-foreground">Активные образовательные проекты</p>
          </CardContent>
          <CardFooter className="text-xs text-green-600 flex items-center border-t pt-2">
            +3 новых за месяц
          </CardFooter>
        </Card>
        
        <Card className="col-span-1 hover:border-bank-blue transition-colors cursor-pointer bg-gradient-to-br from-bank-light-blue/30 to-white">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Олимпиады</CardTitle>
              <Calendar className="h-5 w-5 text-bank-blue" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42</div>
            <p className="text-sm text-muted-foreground">Завершенные олимпиады в этом году</p>
          </CardContent>
          <CardFooter className="text-xs text-green-600 flex items-center border-t pt-2">
            5 планируются в ближайшее время
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Аналитика участников</CardTitle>
                  <CardDescription>Количество участников по месяцам</CardDescription>
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
              <CardTitle>Распределение по профилям</CardTitle>
              <CardDescription>
                Участники по профилям мероприятий
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart margin={{ top: 0, right: 0, bottom: 30, left: 0 }}>
                    <Pie
                      data={profileData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                      label={renderCustomizedLabel}
                    >
                      {profileData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend 
                      layout="horizontal" 
                      verticalAlign="bottom" 
                      align="center"
                      wrapperStyle={{ bottom: 0 }}
                    />
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
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Детализированные отчеты</CardTitle>
                <CardDescription>
                  Выберите тип отчета для просмотра и экспорта
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={reportType} onValueChange={setReportType}>
              <TabsList className="mb-6">
                <TabsTrigger value="participants" className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Участники
                </TabsTrigger>
                <TabsTrigger value="olympiads" className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Олимпиады
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Проекты
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="participants">
                <div className="space-y-6">
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
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => handleExportReport("Excel")}>
                      <Download className="h-4 w-4 mr-2" />
                      Экспорт в Excel
                    </Button>
                    <Button variant="outline" onClick={() => handleExportReport("PDF")}>
                      <Download className="h-4 w-4 mr-2" />
                      Экспорт в PDF
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="olympiads">
                <div className="space-y-6">
                  <div className="h-80">
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center p-8">
                        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <PieChart className="h-8 w-8 text-gray-500" />
                        </div>
                        <h3 className="text-xl font-medium">Статистика по олимпиадам</h3>
                        <p className="text-gray-500 mt-2">
                          Выберите параметры для построения отчета по олимпиадам
                        </p>
                        <Button className="mt-4">Сформировать отчет</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => handleExportReport("Excel")}>
                      <Download className="h-4 w-4 mr-2" />
                      Экспорт в Excel
                    </Button>
                    <Button variant="outline" onClick={() => handleExportReport("PDF")}>
                      <Download className="h-4 w-4 mr-2" />
                      Экспорт в PDF
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="projects">
                <div className="space-y-6">
                  <div className="h-80">
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center p-8">
                        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <BarChart className="h-8 w-8 text-gray-500" />
                        </div>
                        <h3 className="text-xl font-medium">Статистика по проектам</h3>
                        <p className="text-gray-500 mt-2">
                          Выберите параметры для построения отчета по образовательным проектам
                        </p>
                        <Button className="mt-4">Сформировать отчет</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => handleExportReport("Excel")}>
                      <Download className="h-4 w-4 mr-2" />
                      Экспорт в Excel
                    </Button>
                    <Button variant="outline" onClick={() => handleExportReport("PDF")}>
                      <Download className="h-4 w-4 mr-2" />
                      Экспорт в PDF
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
