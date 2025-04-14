import { useRef, useState } from 'react';
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { api } from '~/trpc/react';
import { toast } from 'sonner';

export default function UploadEmailFile() {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const addEmails = api.admin.addAllowedEmail.useMutation();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    // Parse emails: one per line, trimmed, no empty lines
    const emails = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(line)); // basic email regex

    if (emails.length === 0) {
      alert('No valid emails found in file.');
      return;
    }

    try {
      setUploading(true);
      const { success } = await addEmails.mutateAsync(emails);
      if (success) {
        toast.success("update suceessfull")
      }
      toast.success("could not update email")
    } catch (err) {
      console.error(err);
      toast.success("could not update email")
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Upload Allowed Email list</Label>
      <Input id="picture" type="file" accept=".txt" ref={fileInputRef}
        onChange={handleFileChange}
        disabled={uploading} />

    </div>
  );
}



