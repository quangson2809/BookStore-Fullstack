using bookstore.Server.Services.Interfaces;
using System.IO;
using System.Runtime.CompilerServices;

namespace bookstore.Server.Services.implementations
{
    public class LocalFileService : IFileService
    {
        public async Task<String> UpLoadFile( IFormFile ImageFile)
        {
            string Url = "" ;

            // folder path
            string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "products");
            if (Directory.Exists(folderPath) == false)
                Directory.CreateDirectory(folderPath);

            // get extension of file
            string extension = Path.GetExtension(ImageFile.FileName).ToLowerInvariant();
            if(extension != ".jpg" && extension != ".jpeg" && extension != ".gif" && extension != ".png")
                throw new Exception("File không hợp lệ");

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
    }
}
