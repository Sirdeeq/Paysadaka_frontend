import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';

export interface FormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  render?: () => React.ReactNode;
}

interface CustomFormProps {
  fields: FormField[];
  onSubmit: (data: any) => void;
  submitLabel?: string;
  submitClass?: string;

}

export function CustomForm({ fields, onSubmit, submitLabel = 'Submit', submitClass }: CustomFormProps) {
  // Dynamically create zod schema based on fields
  const schemaObj: Record<string, any> = {};
  fields.forEach((field) => {
    if (field.type !== 'custom') {
      let validator = z.string();
      
      if (field.required) {
        validator = validator.min(1, 'This field is required');
      }

      if (field.type === 'email') {
        validator = validator.email('Invalid email address');
      }

      if (field.type === 'tel') {
        validator = validator.regex(/^\d+$/, 'Invalid phone number');
      }

      if (field.type === 'url') {
        validator = validator.url('Invalid URL');
      }

      schemaObj[field.name] = validator;
    }
  });

  const formSchema = z.object(schemaObj);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field) => {
          if (field.type === 'custom' && field.render) {
            return (
              <div key={field.name} className="space-y-2">
                {field.render()}
              </div>
            );
          }

          return (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Input
                      type={field.type}
                      {...formField}
                      placeholder={field.label}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}

        <Button type="submit" className={`w-full ${submitClass}`}>
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
}