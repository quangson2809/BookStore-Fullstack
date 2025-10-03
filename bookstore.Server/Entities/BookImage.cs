using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace bookstore.Server.Entities;

public partial class BookImage
{
    [Key]
    public int BookImageId { get; set; }

    public string BookImageUrl { get; set; } = null!;

    public bool? IsMain { get; set; }

    public int? BookId { get; set; }

    public virtual Book? Book { get; set; }
}
