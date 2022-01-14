
using System;
using System.Drawing;
using System.IO;
namespace SensibleProgramming.ArtificeNFT.Extensions
{
    public static class BitmapExtensions
    {
        public static Bitmap ToBitmap(this MemoryStream stream)
        {
            return new Bitmap(stream);
        }

        public static byte[] ToBytes(this Bitmap b)
        {
            return (byte[])(new ImageConverter().ConvertTo(b, typeof(byte[])));
        }

        public static Bitmap ConvertToBitmap(this byte[] imageData)
        {
            //var ms = new MemoryStream(imageData);
            //Image image = Image.FromStream(ms);
            //lets benchmark to see what is faster
            return new Bitmap(new MemoryStream(imageData));
        }

        public static Bitmap ToBitmap(this FileStream imageData)
        {
            return new Bitmap(imageData);
        }

        public static byte[] ToBitmapBytes(this FileStream imageData)
        {
            return new Bitmap(imageData).ToBytes();
        }

        public static Bitmap Scale(this Bitmap b,int ratio)
        {
           
            int newHeight = b.Height / ratio;
            int newWidth = b.Width / ratio;

            using (Bitmap newPic = new Bitmap(newWidth, newHeight))
            {
                using (Graphics gr = Graphics.FromImage(newPic))
                {
                    gr.DrawImage(b, 0, 0, (newWidth), (newHeight));
                    //string newFilename = ""; /* Put new file path here */
                    //newPic.Save(newFilename, System.Drawing.Imaging.ImageFormat.Jpeg);
                    return newPic;
                }
            }
        }

        public static Bitmap ScaleToHeight(this Bitmap b, float height)
        {
            float ratio = height / b.Height;
            int newWidth = (int)Math.Ceiling(b.Width * ratio);
            Bitmap newPic = new Bitmap(newWidth, (int)height);
           
            using (Graphics gr = Graphics.FromImage(newPic))
            {
                gr.DrawImage(b, 0, 0, (newWidth), (height));
                return newPic;
            }           
        }

        public static Bitmap ScaleToHeight(this Stream imageData, float height)
        {
            Bitmap b = new Bitmap(imageData);
            float ratio = height / b.Height;
            int newWidth = (int)Math.Ceiling(b.Width * ratio);

            using (Bitmap newPic = new Bitmap(newWidth, (int)height))
            {
                using (Graphics gr = Graphics.FromImage(newPic))
                {
                    gr.DrawImage(b, 0, 0, (newWidth), (height));
                    return newPic;
                }
            }
        }

        public static byte[] ToBitmapScaleToHeight(this Stream imageData, int height)
        {
            return imageData.ScaleToHeight(height).ToBytes();
        }
    }
   
}
