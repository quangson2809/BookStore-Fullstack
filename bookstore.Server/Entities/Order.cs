using System;
using System.Collections.Generic;

namespace bookstore.Server.Entities;

public partial class Order
{
    public int OrdersId { get; set; }

    public string? OrdersStatus { get; set; }

    public int? UserId { get; set; }

    public int? PaymentId { get; set; }
    public DateTime? CreateTime { get; set; }

    public string? FullName { get; set; }
    public string? Phone { get; set; }
    public string? Address { get; set; }
    public string? Email { get; set; }
    public string? Note { get; set; }
    public virtual ICollection<OrdersDetail> OrdersDetails { get; set; } = new List<OrdersDetail>();

    public virtual Payment? Payment { get; set; }

    public virtual User? User { get; set; }
}
