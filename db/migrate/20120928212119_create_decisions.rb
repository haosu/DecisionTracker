class CreateDecisions < ActiveRecord::Migration
  def change
    create_table :decisions do |t|
      t.string :name
      t.integer :value
      t.integer :time

      t.timestamps
    end
  end
end
