
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
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, ArrowRight, CheckCircle2, Download, FileUp, Upload, UploadCloud } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const ImportPage: React.FC = () => {
  const { toast } = useToast();
  const [importType, setImportType] = useState("participants");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importProgress, setImportProgress] = useState(0);
  const [importStatus, setImportStatus] = useState<'idle' | 'uploading' | 'processing' | 'completed' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setImportProgress(0);
      setImportStatus('idle');
      setErrorMessage(null);
    }
  };

  const handleImportData = () => {
    if (!selectedFile) {
      toast({
        title: "Выберите файл",
        description: "Пожалуйста, выберите файл для импорта.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate file upload process
    setImportStatus('uploading');
    let progress = 0;
    
    const interval = setInterval(() => {
      progress += 10;
      setImportProgress(progress);
      
      if (progress === 100) {
        clearInterval(interval);
        setImportStatus('processing');
        
        // Simulate processing
        setTimeout(() => {
          // Randomly succeed or fail for demo
          if (Math.random() > 0.3) {
            setImportStatus('completed');
            toast({
              title: "Импорт успешно завершен",
              description: "Данные успешно импортированы в систему."
            });
          } else {
            setImportStatus('error');
            setErrorMessage("Некорректный формат данных. Проверьте файл и попробуйте снова.");
            toast({
              title: "Ошибка импорта",
              description: "Произошла ошибка при импорте данных.",
              variant: "destructive"
            });
          }
        }, 2000);
      }
    }, 300);
  };

  const handleDownloadTemplate = () => {
    toast({
      title: "Шаблон скачан",
      description: `Шаблон для импорта ${
        importType === "participants" ? "участников" : 
        importType === "mentors" ? "наставников" : "мероприятий"
      } скачан.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Импорт данных</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Загрузка данных</CardTitle>
              <CardDescription>
                Импортируйте данные из файла Excel, CSV или JSON
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Тип данных</Label>
                <Select value={importType} onValueChange={setImportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип данных" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="participants">Участники</SelectItem>
                    <SelectItem value="mentors">Наставники</SelectItem>
                    <SelectItem value="events">Мероприятия</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Файл</Label>
                <div className="border-2 border-dashed rounded-md py-10 px-6 text-center cursor-pointer hover:border-gray-400 transition-colors" onClick={() => document.getElementById('file-input')?.click()}>
                  <div className="space-y-2">
                    <div className="flex justify-center">
                      <UploadCloud className="h-10 w-10 text-gray-400" />
                    </div>
                    <div className="text-sm font-medium">
                      {selectedFile ? (
                        <span className="text-blue-600">{selectedFile.name}</span>
                      ) : (
                        <>
                          <span className="text-blue-600 font-medium">Нажмите для загрузки</span> или 
                          перетащите файл
                        </>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      Поддерживаются файлы XLSX, CSV и JSON (макс. 10MB)
                    </p>
                  </div>
                  <Input 
                    id="file-input" 
                    type="file" 
                    accept=".csv,.xlsx,.json" 
                    className="hidden" 
                    onChange={handleFileSelect}
                  />
                </div>
              </div>
              
              {importStatus !== 'idle' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">
                      {importStatus === 'uploading' && "Загрузка..."}
                      {importStatus === 'processing' && "Обработка..."}
                      {importStatus === 'completed' && "Импорт завершен"}
                      {importStatus === 'error' && "Ошибка импорта"}
                    </span>
                    <span className="text-gray-500">
                      {importStatus === 'uploading' && `${importProgress}%`}
                    </span>
                  </div>
                  
                  {importStatus === 'uploading' && (
                    <Progress value={importProgress} className="h-2" />
                  )}
                  
                  {importStatus === 'processing' && (
                    <div className="text-center py-4">
                      <div className="animate-pulse">Обработка данных...</div>
                    </div>
                  )}
                  
                  {importStatus === 'completed' && (
                    <div className="rounded-md bg-green-50 p-4 text-sm text-green-800 flex items-start">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 mr-3" />
                      <div>
                        <p className="font-medium">Импорт успешно завершен</p>
                        <p className="mt-1">Все данные были успешно импортированы в систему.</p>
                      </div>
                    </div>
                  )}
                  
                  {importStatus === 'error' && errorMessage && (
                    <div className="rounded-md bg-red-50 p-4 text-sm text-red-800 flex items-start">
                      <AlertCircle className="h-5 w-5 flex-shrink-0 mr-3" />
                      <div>
                        <p className="font-medium">Ошибка импорта</p>
                        <p className="mt-1">{errorMessage}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleDownloadTemplate}>
                  <Download className="h-4 w-4 mr-2" />
                  Скачать шаблон
                </Button>
                <Button 
                  onClick={handleImportData}
                  disabled={!selectedFile || importStatus === 'uploading' || importStatus === 'processing'}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Импортировать
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Инструкция</CardTitle>
              <CardDescription>
                Как импортировать данные в систему
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ol className="space-y-4 text-sm">
                <li className="flex items-start">
                  <span className="bg-gray-200 text-gray-700 h-6 w-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">1</span>
                  <span>Выберите тип данных для импорта (участники, наставники или мероприятия).</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gray-200 text-gray-700 h-6 w-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">2</span>
                  <span>Скачайте шаблон, чтобы подготовить данные в правильном формате.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gray-200 text-gray-700 h-6 w-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">3</span>
                  <span>Заполните шаблон вашими данными и сохраните файл.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gray-200 text-gray-700 h-6 w-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">4</span>
                  <span>Загрузите заполненный файл через форму слева.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gray-200 text-gray-700 h-6 w-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">5</span>
                  <span>Нажмите кнопку "Импортировать" и дождитесь завершения процесса.</span>
                </li>
              </ol>
              
              <Separator />
              
              <div className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-800">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 text-yellow-800" />
                  <div>
                    <p className="font-medium">Важно!</p>
                    <p className="mt-1">
                      Система проверяет данные перед импортом. Убедитесь, что ваши данные 
                      соответствуют требуемому формату и не содержат ошибок.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImportPage;
