'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { SavedMedia } from '@/lib/types';
import { useEffect } from 'react';

const formSchema = z.object({
  userRating: z.number().min(0).max(10),
  notes: z.string().max(500).nullable(),
});

type FormData = z.infer<typeof formSchema>;

interface EditProfileItemDialogProps {
  item: SavedMedia;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSave: (updatedItem: SavedMedia) => void;
}

export function EditProfileItemDialog({
  item,
  isOpen,
  setIsOpen,
  onSave,
}: EditProfileItemDialogProps) {
  const { control, handleSubmit, reset, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userRating: item.userRating ?? 0,
      notes: item.notes ?? '',
    },
  });

  const ratingValue = watch('userRating');

  useEffect(() => {
    reset({
      userRating: item.userRating ?? 0,
      notes: item.notes ?? '',
    });
  }, [item, reset]);

  const onSubmit = (data: FormData) => {
    onSave({
      ...item,
      userRating: data.userRating,
      notes: data.notes,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar: {item.title}</DialogTitle>
          <DialogDescription>
            Atualize sua nota e anotações para este {item.type === 'movie' ? 'filme' : 'série'}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="userRating">Sua Nota: {ratingValue} / 10</Label>
            <Controller
              name="userRating"
              control={control}
              render={({ field }) => (
                <Slider
                  id="userRating"
                  min={0}
                  max={10}
                  step={1}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                />
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Anotações</Label>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="notes"
                  placeholder="Suas impressões sobre o filme/série..."
                  {...field}
                  value={field.value ?? ''}
                  rows={4}
                />
              )}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}