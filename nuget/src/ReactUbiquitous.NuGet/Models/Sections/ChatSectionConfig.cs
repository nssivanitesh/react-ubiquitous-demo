using System.Text.Json.Serialization;

namespace ReactUbiquitous.NuGet.Models.Sections;

/// <summary>Represents a single message in a chat conversation.</summary>
public class ChatMessage
{
    /// <summary>Gets or sets the unique identifier of the message.</summary>
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    /// <summary>Gets or sets the text content of the message.</summary>
    [JsonPropertyName("text")]
    public string Text { get; set; } = string.Empty;

    /// <summary>Gets or sets the display name of the sender.</summary>
    [JsonPropertyName("sender")]
    public string Sender { get; set; } = string.Empty;

    /// <summary>Gets or sets the role of the sender (e.g. "user", "assistant").</summary>
    [JsonPropertyName("role")]
    public string Role { get; set; } = string.Empty;

    /// <summary>Gets or sets the timestamp of the message.</summary>
    [JsonPropertyName("timestamp")]
    public string? Timestamp { get; set; }

    /// <summary>Gets or sets the URL of the sender's avatar image.</summary>
    [JsonPropertyName("avatar")]
    public string? Avatar { get; set; }
}

/// <summary>Represents a chat conversation thread shown in the conversation list.</summary>
public class ChatConversation
{
    /// <summary>Gets or sets the unique identifier of the conversation.</summary>
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    /// <summary>Gets or sets the display label for the conversation.</summary>
    [JsonPropertyName("label")]
    public string Label { get; set; } = string.Empty;

    /// <summary>Gets or sets the secondary label for the conversation (e.g. last message preview).</summary>
    [JsonPropertyName("sublabel")]
    public string? Sublabel { get; set; }

    /// <summary>Gets or sets the URL of the conversation partner's avatar image.</summary>
    [JsonPropertyName("avatar")]
    public string? Avatar { get; set; }

    /// <summary>Gets or sets the badge text (e.g. unread message count) for the conversation.</summary>
    [JsonPropertyName("badge")]
    public string? Badge { get; set; }

    /// <summary>Gets or sets the list of messages in the conversation.</summary>
    [JsonPropertyName("messages")]
    public List<ChatMessage>? Messages { get; set; }
}

/// <summary>Configuration for a chat section with a conversation list and message view.</summary>
public class ChatSectionConfig : BaseSectionConfig
{
    /// <summary>Initializes a new instance of <see cref="ChatSectionConfig"/> and sets the layout discriminator.</summary>
    public ChatSectionConfig() { Layout = "chat"; }

    /// <summary>Gets or sets the list of available chat conversations.</summary>
    [JsonPropertyName("conversations")]
    public List<ChatConversation>? Conversations { get; set; }

    /// <summary>Gets or sets the heading shown above the conversation list.</summary>
    [JsonPropertyName("listTitle")]
    public string? ListTitle { get; set; }

    /// <summary>Gets or sets the CSS width of the conversation list panel.</summary>
    [JsonPropertyName("listWidth")]
    public string? ListWidth { get; set; }

    /// <summary>Gets or sets the placeholder text for the message input field.</summary>
    [JsonPropertyName("inputPlaceholder")]
    public string? InputPlaceholder { get; set; }

    /// <summary>Gets or sets the label text for the send button.</summary>
    [JsonPropertyName("sendButtonText")]
    public string? SendButtonText { get; set; }

    /// <summary>Gets or sets the display name of the current user.</summary>
    [JsonPropertyName("currentUserName")]
    public string? CurrentUserName { get; set; }
}
