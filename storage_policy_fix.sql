-- 1. 允許已登入的使用者上傳圖片
create policy "Authenticated users can upload images"
on storage.objects for insert
with check (
  bucket_id = 'item-images'
  and auth.role() = 'authenticated'
);

-- 2. 允許任何人查看圖片 (因為我們設定為 Public Bucket，這條其實是備用，以防萬一)
create policy "Everyone can view images"
on storage.objects for select
using ( bucket_id = 'item-images' );

-- 3. 允許使用者刪除/更新自己上傳的圖片 (選擇性)
create policy "Users can update their own images"
on storage.objects for update
using ( auth.uid() = owner )
with check ( bucket_id = 'item-images' );

create policy "Users can delete their own images"
on storage.objects for delete
using ( auth.uid() = owner and bucket_id = 'item-images' );
