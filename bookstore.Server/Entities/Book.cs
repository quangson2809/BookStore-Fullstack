using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace bookstore.Server.Entities;

public partial class Book
{
    [Key]
    public int BookId { get; set; }

    public string BookName { get; set; } = null!;

    public decimal OriginalPrice { get; set; }

    public decimal? SalePrice { get; set; }

    public string? BookStatus { get; set; }

    public DateOnly? PublishTime { get; set; }

    public int? StockQuantity { get; set; }

    public string? Isbn { get; set; }
    [MaxLength(50)]
    public string? Language {  get; set; }
    public int? PageNumber { get; set; }

    public int? CategoryId { get; set; }

    public int? PublisherId { get; set; }

    public int? AuthorId { get; set; }

    public virtual Author? Author { get; set; }

    public virtual ICollection<BookImage> BookImages { get; set; } = new List<BookImage>();

    public virtual ICollection<CartDetail> CartDetails { get; set; } = new List<CartDetail>();

    public virtual Category? Category { get; set; }

    public virtual ICollection<OrdersDetail> OrdersDetails { get; set; } = new List<OrdersDetail>();

    public virtual Publisher? Publisher { get; set; }
}
