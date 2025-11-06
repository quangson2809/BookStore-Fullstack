using bookstore.Server.Data;
using bookstore.Server.Entities;
using bookstore.Server.Repositories.Interfaces;
using bookstore.Server.Services.Interfaces;
using System.IO;
using System.Reflection;
using System.Runtime.CompilerServices;

namespace bookstore.Server.Services.implementations
{
    public class LocalFileService : IFileService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;


        public LocalFileService()
        {
           
        }
        public async Task<String> UpLoadFile( IFormFile ImageFile)
        {
            string Url = "" ;
            if(ImageFile == null) 
                throw new Exception("File không tồn tại");

            // folder path
            string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "products");
            if (Directory.Exists(folderPath) == false)
                Directory.CreateDirectory(folderPath);

            // get extension of file
            string extension = Path.GetExtension(ImageFile.FileName).ToLowerInvariant();
            if(extension != ".jpg" && extension != ".jpeg" && extension != ".gif" && extension != ".png")
                throw new Exception("File không hợp lệ, phải là đuôi .jpg .gif .png .jpeg");

            // create unique file name
            var fileName = $"{Guid.NewGuid()}{extension}";
            var filePath = Path.Combine(folderPath, fileName);

            // save file to folder
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await ImageFile.CopyToAsync(stream);
            }
            return Url =$"/images/products/{fileName}";
        }
        public async Task DeleteFile(BookImage bookImage)
        {
            if( bookImage == null)
                throw new Exception("File không tồn tại");
            //delete file from folder
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", bookImage.BookImageUrl.TrimStart('/'));
            System.IO.File.Delete(filePath);
        }
    }
}
