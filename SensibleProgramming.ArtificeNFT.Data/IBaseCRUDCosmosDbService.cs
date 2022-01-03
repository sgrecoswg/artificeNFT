using System.Collections.Generic;
using System.Threading.Tasks;

namespace SensibleProgramming.ArtificeNFT.Data
{
    public interface IBaseCRUDCosmosDbService<T>
    {
        Task<IEnumerable<T>> GetItemsAsync(string query="");
        Task<T> GetItemAsync(string id);
        Task AddItemAsync(T item);
        Task UpdateItemAsync(string id, T item);
        Task DeleteItemAsync(string id);
    }
}
