class ChangeNullColumnSboms < ActiveRecord::Migration[7.0]
  def change
    # Makes the SBOM not dependent on a user
    change_column_null :sboms, :user_id, true
  end
end
