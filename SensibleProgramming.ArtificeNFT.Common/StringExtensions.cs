
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace SensibleProgramming.ArtificeNFT.Extensions
{
    public static class StringExtensions
        {

            public static string DecodeAsBase64(this string encodedValue)
            {
                if (!string.IsNullOrEmpty(encodedValue))
                {
                    var encodedValueAsBytes = Convert.FromBase64String(encodedValue);
                    return Encoding.UTF8.GetString(encodedValueAsBytes);
                }
                return "";
            }

            /// <summary>
            ///
            /// </summary>
            /// <param name="extension"></param>
            /// <returns></returns>
            public static string GetMimeType(this string extension)
            {

                string s = string.Empty;
                extension = extension.Replace(".", "");

                #region Get proper type
                switch (extension)
                {
                    #region audio

                    case "wav":
                        s = "audio/wav";
                        break;

                    case "mp3":
                        s = "audio/mp3";
                        break;

                    case "m4a":
                        s = "audio/m4a";
                        break;

                    #endregion

                    #region video

                    case "avi":
                        s = "video/x-msvideo";
                        break;

                    case "wmv":
                        s = "video/x-ms-wmv";
                        break;
                    case "mp2":
                        s = "video/mpeg";
                        break;
                    case "mov":
                        s = "video/quicktime";
                        break;

                    #endregion

                    #region images

                    case "png":
                        s = "image/png";
                        break;

                    case "jpeg":
                    case "jpg":
                        s = "image/jpeg";
                        break;

                    case "ico":
                        s = "image/x-icon";
                        break;

                    case "gif":
                        s = "image/gif";
                        break;

                    #endregion

                    #region apps

                    case "html":
                        s = "text/html";
                        break;

                    case "pdf":
                        s = "application/pdf";
                        break;

                    case "xls":
                        s = "application/vnd.ms-excel";
                        break;
                    case "doc":
                        s = "application/msword";
                        break;

                    case "pub":
                        s = "application/x-mspublisher";
                        break;
                    case "txt":
                        s = "text/plain";
                        break;

                    case "zip":
                        s = "application/x-zip-compressed";
                        break;

                    case "rar":
                        s = "application/octet-stream";
                        break;
                    case "pps":
                        s = "application/vnd.ms-powerpoint";
                        break;

                    case "msi":
                        s = "application/octet-stream";
                        break;

                    case "css":
                        s = "text/css";
                        break;

                    case "dll":
                        s = "application/x-msdownload";
                        break;

                    #endregion

                    default:
                        s = "application/octet-stream";
                        break;
                }
                #endregion

                return s;

            }

            /// <summary>
            /// Returns substring of a given string.
            /// </summary>
            /// <param name="value">string value</param>
            /// <param name="maxLength">length of substring</param>
            /// <returns>returns substring of specified length</returns>
            public static string Truncate(this string value, int maxLength)
            {
                return value.Length <= maxLength ? value : value.Substring(0, maxLength);
            }

            /// <summary>
            /// To get relative path of image 
            /// </summary>
            /// <param name="image">string image path</param>
            /// <returns>returns relative path of image </returns>
            public static string GetImageRelativePath(string image)
            {
                if (!string.IsNullOrEmpty(image))
                {
                    return image.Replace("~", string.Empty);
                }
                return string.Empty;
            }

            /// <summary>
            /// 
            /// </summary>
            /// <param name="theString"></param>
            /// <param name="tokens"></param>
            /// <returns></returns>
            public static bool ContainsAny(this string theString, params string[] tokens)
            {
                var lowerCaseString = theString.ToLower();
                return tokens.Any(lowerCaseString.Contains);
            }

            /// <summary>
            /// Indicate whether a given string equals any of the specified substrings. 
            /// </summary>
            /// <param name="theString">String to process</param>
            /// <param name="args">List of possible matches</param>
            /// <returns>True/False</returns>
            public static bool EqualsAny(this string theString, params string[] args)
            {
                return args.Any(token => theString.Equals(token, StringComparison.InvariantCultureIgnoreCase));
            }

            /// <summary>
            /// 
            /// </summary>
            /// <param name="tokens"></param>
            /// <returns></returns>
            public static bool IsAnyNullOrEmpty(params string[] tokens)
            {
                return tokens.Any(string.IsNullOrWhiteSpace);
            }

            /// <summary>
            /// 
            /// </summary>
            /// <param name="theString"></param>
            /// <returns></returns>
            public static bool IsNullOrEmpty(this string theString)
            {
                return string.IsNullOrWhiteSpace(theString);
            }

            public static bool IsNull(this string s)
            {
                return string.IsNullOrEmpty(s);
            }

            public static bool IsNotNull(this string s)
            {
                return !string.IsNullOrEmpty(s);
            }

            /// <summary>
            /// 
            /// </summary>
            /// <param name="theString"></param>
            /// <returns></returns>
            public static bool HasAValue(this string theString)
            {
                return !string.IsNullOrWhiteSpace(theString);
            }

            /// <summary>
            /// Parse a given string to a date.
            /// </summary>
            /// <param name="theString">String to parse</param>
            /// <param name="defaultDate">Date to return in case of failure</param>
            /// <returns>Date</returns>
            public static DateTime ToDate(this string theString, DateTime defaultDate = default(DateTime))
            {
                DateTime date;
                var success = DateTime.TryParse(theString, out date);
                return success ? date : defaultDate;  //DateTime.MinValue;
            }

            /// <summary>
            /// Get a slice of the provided string that begins at specified substring.
            /// </summary>
            /// <param name="theString">String to process</param>
            /// <param name="marker">Substring to locate</param>
            /// <param name="shouldIncludeMarker">Whether substring should be skipped or included</param>
            /// <returns>Substring</returns>
            public static string SubstringFrom(this string theString, string marker, bool shouldIncludeMarker = false)
            {
                var index = theString.IndexOf(marker, StringComparison.InvariantCultureIgnoreCase);
                if (index < 0)
                    return theString;

                var startIndex = shouldIncludeMarker ? index : index + marker.Length;
                return theString.Substring(startIndex);
            }

            /// <summary>
            /// Get a slice of the provided string that ends at the specified substring.
            /// </summary>
            /// <param name="theString">String to process</param>
            /// <param name="marker">Substring to locate</param>
            /// <param name="shouldIncludeMarker">Whether substring should be skipped or included</param>
            /// <returns>Substring</returns>
            public static string SubstringTo(this string theString, string marker, bool shouldIncludeMarker = false)
            {
                var index = theString.IndexOf(marker, StringComparison.InvariantCultureIgnoreCase);
                if (index < 0)
                    return theString;

                var endIndex = shouldIncludeMarker ? index + marker.Length : index;
                return theString.Substring(0, endIndex);
            }

            /// <summary>
            /// Get a slice of the provided string included between markers (not included)
            /// </summary>
            /// <param name="theString">String to process</param>
            /// <param name="marker1">Initial substring</param>
            /// <param name="marker2">Ending substring</param>
            /// <returns>Substring</returns>
            public static string SubstringBetween(this string theString, string marker1, string marker2)
            {
                var temp = theString.SubstringFrom(marker1);
                return temp.SubstringTo(marker2);
            }

            /// <summary>
            /// Repeats the specified string for the specified number of times.
            /// </summary>
            /// <param name="theString">String to process</param>
            /// <param name="count">Number of repetitions</param>
            /// <returns>New string</returns>
            public static string Repeat(this string theString, int count = 2)
            {
                if (count <= 0 || string.IsNullOrEmpty(theString))
                    return string.Empty;

                var builder = new StringBuilder();
                for (var i = 0; i < count; i++)
                {
                    builder.Append(theString);
                }
                return builder.ToString();
            }

            /// <summary>
            /// Counts the number of words in the string
            /// </summary>
            /// <param name="theString">String to process</param>
            /// <returns>Number of words in the string</returns>
            public static int WordCount(this string theString)
            {
                if (string.IsNullOrWhiteSpace(theString))
                    return 0;

                var buffer = theString.Trim();
                var count = buffer.Split(' ').Length;
                return count;
            }

            /// <summary>
            /// Counts the number of characters in the string
            /// </summary>
            /// <param name="theString">String to process</param>
            /// <returns>Number of characters in the string</returns>
            public static int CharCount(this string theString)
            {
                if (string.IsNullOrWhiteSpace(theString))
                    return 0;
                return theString.Length;
            }

            /// <summary>
            /// Merges char {0} and {1} word count in a new string according to given format string
            /// </summary>
            /// <param name="theString">String to process</param>
            /// <param name="format">Format to apply to resulting string</param>
            /// <returns>New string</returns>
            public static string SplitCount(this string theString, string format)
            {
                // 0 = char count, 1 = word count
                if (string.IsNullOrWhiteSpace(format))
                    return string.Empty;

                return string.Format(format, theString.CharCount(), theString.WordCount());
            }

            /// <summary>
            /// Replaces all occurrences of given tokens with the same replace string.
            /// </summary>
            /// <param name="theString">String to process</param>
            /// <param name="replaceString">String to be used to replace tokens in the input string </param>
            /// <param name="tokens">Substring to be replaced with replaceString</param>
            /// <returns>Modified string</returns>
            public static string ReplaceAny(this string theString, string replaceString, params string[] tokens)
            {
                return tokens.Aggregate(theString, (current, t) => current.Replace(t, replaceString));
            }

            /// <summary>
            /// If the string is null or empty, return the specified default text
            /// </summary>
            /// <param name="theString">String to process</param>
            /// <param name="defaultString">Default string to return</param>
            /// <returns>Modified string</returns>
            public static string Default(this string theString, string defaultString = "")
            {
                return theString.IsNullOrEmpty() ? defaultString : theString;
            }

            public static string Combine(this IEnumerable<string> array, char characterToCombineWith = ',')
            {
                string result = string.Empty;
                for (int i = 0; i < (array.Count() - 1); i++)
                {
                    result += array.ElementAt(i) + characterToCombineWith.ToString();
                }
                result = result.Trim(',');
                return result;
            }

        /// <summary>
        /// Calls ToUpper on all the strings in the array.
        /// </summary>
        /// <param name="a"></param>
        /// <returns></returns>
        public static string[] ToUpper(this string[] a)
        {
            string[] result = new string[a.Length];
            for (int i = 0; i < a.Length; i++)
            {
                result[i] = a[i].ToUpper();
            }
            return result;
        }
    }
}
