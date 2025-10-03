using System;
using System.Collections.Generic;

namespace bookstore.Server.Entities;

public partial class OrdersDetail
{
    public int OrderId { get; set; }

    public int BookId { get; set; }

    public int Quantity { get; set; }

    public decimal? TotalPrice { get; set; }

    public DateTime? CreateTime { get; set; }

    public virtual Book Book { get; set; } = null!;

    public virtual Order Order { get; set; } = null!;
}
