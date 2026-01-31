import { createClient } from "@/lib/supabase/client";

export async function uploadProductImages(files: File[], userId: string) {
    const supabase = createClient();
    const uploadedUrls: string[] = [];

    for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${userId}/${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
            .from("product-images")
            .upload(filePath, file);

        if (uploadError) {
            console.error("Error uploading image:", uploadError);
            continue;
        }

        const { data: { publicUrl } } = supabase.storage
            .from("product-images")
            .getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
    }

    return uploadedUrls;
}
