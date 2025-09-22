import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound } from 'lucide-react';

export default function ApiKeyPage() {
  const apiKey = 'f0f837126ad3f38f1d78d397c936a14d';

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-4xl font-headline text-primary text-center">
        Chave da API
      </h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="w-6 h-6" />
            <span>API Key do TMDB</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Esta é a chave de API utilizada neste projeto para se comunicar com a The Movie Database (TMDB).
          </p>
          <div className="p-4 bg-muted rounded-md font-code text-center text-lg break-words">
            {apiKey}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
